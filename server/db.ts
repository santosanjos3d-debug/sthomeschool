import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, products, orders, orderItems, adminSessions, InsertProduct, Product, Order, OrderItem, InsertOrder, InsertOrderItem, InsertAdminSession, AdminSession } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Admin queries - Products

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  try {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get product by id:", error);
    return undefined;
  }
}

export async function getAllProducts() {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(products).orderBy(desc(products.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get all products:", error);
    return [];
  }
}

export async function updateProduct(id: number, updates: Partial<InsertProduct>) {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.update(products).set(updates).where(eq(products.id, id));
    return getProductById(id);
  } catch (error) {
    console.error("[Database] Failed to update product:", error);
    throw error;
  }
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.delete(products).where(eq(products.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete product:", error);
    return false;
  }
}

// Admin queries - Orders
export async function getAllOrders() {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get all orders:", error);
    return [];
  }
}

export async function updateOrderStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.update(orders).set({ paymentStatus: status }).where(eq(orders.id, id));
    return getOrderById(id);
  } catch (error) {
    console.error("[Database] Failed to update order status:", error);
    throw error;
  }
}

export async function getOrderById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  try {
    const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get order by id:", error);
    return undefined;
  }
}

// Shop queries - Products
export async function createProduct(product: InsertProduct): Promise<Product | null | undefined> {
  const db = await getDb();
  if (!db) return null;
  try {
    const result = await db.insert(products).values(product);
    const id = result[0].insertId as number;
    return getProductById(id);
  } catch (error) {
    console.error("[Database] Failed to create product:", error);
    throw error;
  }
}

// Shop queries - Orders
export async function createOrder(order: InsertOrder): Promise<Order | null | undefined> {
  const db = await getDb();
  if (!db) return null;
  try {
    const result = await db.insert(orders).values(order);
    const id = result[0].insertId as number;
    return getOrderById(id);
  } catch (error) {
    console.error("[Database] Failed to create order:", error);
    throw error;
  }
}

export async function createOrderItem(item: InsertOrderItem): Promise<OrderItem | null | undefined> {
  const db = await getDb();
  if (!db) return null;
  try {
    const result = await db.insert(orderItems).values(item);
    const id = result[0].insertId as number;
    const items = await db.select().from(orderItems).where(eq(orderItems.id, id)).limit(1);
    return items.length > 0 ? items[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to create order item:", error);
    throw error;
  }
}

export async function getOrderItems(orderId: number): Promise<OrderItem[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  } catch (error) {
    console.error("[Database] Failed to get order items:", error);
    return [];
  }
}

export async function getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  try {
    const result = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get order by number:", error);
    return undefined;
  }
}

export async function getProducts(): Promise<Product[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(products).where(eq(products.active, true));
  } catch (error) {
    console.error("[Database] Failed to get products:", error);
    return [];
  }
}

// Admin Sessions
export async function createAdminSession(email: string, expiresAt: Date): Promise<AdminSession | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    // Generate random token
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    const result = await db.insert(adminSessions).values({
      token,
      email,
      expiresAt,
    });
    
    const id = result[0].insertId as number;
    const sessions = await db.select().from(adminSessions).where(eq(adminSessions.id, id)).limit(1);
    return sessions.length > 0 ? sessions[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create admin session:", error);
    throw error;
  }
}

export async function getAdminSessionByToken(token: string): Promise<AdminSession | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  try {
    const result = await db.select().from(adminSessions).where(eq(adminSessions.token, token)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get admin session:", error);
    return undefined;
  }
}

export async function markAdminSessionAsUsed(token: string): Promise<AdminSession | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  try {
    await db.update(adminSessions).set({ usedAt: new Date() }).where(eq(adminSessions.token, token));
    return await getAdminSessionByToken(token);
  } catch (error) {
    console.error("[Database] Failed to mark admin session as used:", error);
    throw error;
  }
}

export async function deleteExpiredAdminSessions(): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.delete(adminSessions).where(eq(adminSessions.expiresAt, new Date())); // This is a simplified version
  } catch (error) {
    console.error("[Database] Failed to delete expired admin sessions:", error);
  }
}
