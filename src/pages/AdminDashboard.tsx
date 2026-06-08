import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

type Tab = 'dashboard' | 'products' | 'orders';

export default function AdminDashboard() {
  const { language } = useLanguage();
  const { isAuthenticated, logout } = useAdminAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/admin-login');
    }
  }, [isAuthenticated, setLocation]);

  // Queries
  const { data: products = [] } = trpc.admin.getProducts.useQuery();
  const { data: orders = [] } = trpc.admin.getOrders.useQuery();

  // Mutations
  const createProductMutation = trpc.admin.createProduct.useMutation();
  const updateProductMutation = trpc.admin.updateProduct.useMutation();
  const deleteProductMutation = trpc.admin.deleteProduct.useMutation();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    weight: '',
    length: '',
    width: '',
    height: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitProduct = async () => {
    if (!formData.name || !formData.price) {
      alert('Nome e preço são obrigatórios');
      return;
    }

    try {
      if (editingProduct) {
        await updateProductMutation.mutateAsync({
          id: editingProduct.id,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          imageUrl: formData.imageUrl,
          weight: formData.weight ? parseInt(formData.weight) : undefined,
          length: formData.length ? parseInt(formData.length) : undefined,
          width: formData.width ? parseInt(formData.width) : undefined,
          height: formData.height ? parseInt(formData.height) : undefined,
        });
      } else {
        await createProductMutation.mutateAsync({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          imageUrl: formData.imageUrl,
          weight: formData.weight ? parseInt(formData.weight) : undefined,
          length: formData.length ? parseInt(formData.length) : undefined,
          width: formData.width ? parseInt(formData.width) : undefined,
          height: formData.height ? parseInt(formData.height) : undefined,
        });
      }

      setFormData({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        weight: '',
        length: '',
        width: '',
        height: '',
      });
      setEditingProduct(null);
      setShowProductForm(false);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Erro ao salvar produto');
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: (product.price / 100).toString(),
      imageUrl: product.imageUrl || '',
      weight: product.weight?.toString() || '',
      length: product.length?.toString() || '',
      width: product.width?.toString() || '',
      height: product.height?.toString() || '',
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        await deleteProductMutation.mutateAsync({ id });
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Erro ao deletar produto');
      }
    }
  };

  const translations = {
    pt: {
      admin: 'Painel de Administração',
      dashboard: 'Dashboard',
      products: 'Produtos',
      orders: 'Pedidos',
      newProduct: 'Novo Produto',
      editProduct: 'Editar Produto',
      name: 'Nome',
      description: 'Descrição',
      price: 'Preço (R$)',
      imageUrl: 'URL da Imagem',
      weight: 'Peso (g)',
      length: 'Comprimento (cm)',
      width: 'Largura (cm)',
      height: 'Altura (cm)',
      save: 'Salvar',
      cancel: 'Cancelar',
      delete: 'Deletar',
      edit: 'Editar',
      totalProducts: 'Total de Produtos',
      totalOrders: 'Total de Pedidos',
      totalRevenue: 'Receita Total',
      orderNumber: 'Número do Pedido',
      customer: 'Cliente',
      email: 'Email',
      total: 'Total',
      status: 'Status',
      date: 'Data',
      noProducts: 'Nenhum produto cadastrado',
      noOrders: 'Nenhum pedido realizado',
    },
    en: {
      admin: 'Admin Dashboard',
      dashboard: 'Dashboard',
      products: 'Products',
      orders: 'Orders',
      newProduct: 'New Product',
      editProduct: 'Edit Product',
      name: 'Name',
      description: 'Description',
      price: 'Price (R$)',
      imageUrl: 'Image URL',
      weight: 'Weight (g)',
      length: 'Length (cm)',
      width: 'Width (cm)',
      height: 'Height (cm)',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      totalProducts: 'Total Products',
      totalOrders: 'Total Orders',
      totalRevenue: 'Total Revenue',
      orderNumber: 'Order Number',
      customer: 'Customer',
      email: 'Email',
      total: 'Total',
      status: 'Status',
      date: 'Date',
      noProducts: 'No products registered',
      noOrders: 'No orders placed',
    },
  };

  const t = translations[language as keyof typeof translations] || translations.pt;

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">{t.admin}</h1>
          <Button
            onClick={logout}
            variant="outline"
            size="sm"
          >
            Sair
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 flex gap-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-3 border-b-2 transition ${
              activeTab === 'dashboard'
                ? 'border-primary text-primary'
                : 'border-transparent text-foreground/60 hover:text-foreground'
            }`}
          >
            {t.dashboard}
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-3 border-b-2 transition ${
              activeTab === 'products'
                ? 'border-primary text-primary'
                : 'border-transparent text-foreground/60 hover:text-foreground'
            }`}
          >
            {t.products}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-3 border-b-2 transition ${
              activeTab === 'orders'
                ? 'border-primary text-primary'
                : 'border-transparent text-foreground/60 hover:text-foreground'
            }`}
          >
            {t.orders}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-foreground/60 text-sm mb-2">{t.totalProducts}</p>
              <p className="text-3xl font-bold text-foreground">{products.length}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-foreground/60 text-sm mb-2">{t.totalOrders}</p>
              <p className="text-3xl font-bold text-foreground">{orders.length}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-foreground/60 text-sm mb-2">{t.totalRevenue}</p>
              <p className="text-3xl font-bold text-primary">
                R$ {(totalRevenue / 100).toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-foreground">{t.products}</h2>
              <Button
                onClick={() => {
                  setEditingProduct(null);
                  setFormData({
                    name: '',
                    description: '',
                    price: '',
                    imageUrl: '',
                    weight: '',
                    length: '',
                    width: '',
                    height: '',
                  });
                  setShowProductForm(true);
                }}
                className="gap-2"
              >
                <Plus size={18} />
                {t.newProduct}
              </Button>
            </div>

            {showProductForm && (
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {editingProduct ? t.editProduct : t.newProduct}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      {t.name} *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t.name}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      {t.description}
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder={t.description}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        {t.price} *
                      </label>
                      <Input
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder={t.price}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        {t.imageUrl}
                      </label>
                      <Input
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        placeholder={t.imageUrl}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        {t.weight}
                      </label>
                      <Input
                        name="weight"
                        type="number"
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder={t.weight}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        {t.length}
                      </label>
                      <Input
                        name="length"
                        type="number"
                        value={formData.length}
                        onChange={handleInputChange}
                        placeholder={t.length}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        {t.width}
                      </label>
                      <Input
                        name="width"
                        type="number"
                        value={formData.width}
                        onChange={handleInputChange}
                        placeholder={t.width}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        {t.height}
                      </label>
                      <Input
                        name="height"
                        type="number"
                        value={formData.height}
                        onChange={handleInputChange}
                        placeholder={t.height}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSubmitProduct}>{t.save}</Button>
                    <Button
                      onClick={() => setShowProductForm(false)}
                      variant="outline"
                    >
                      {t.cancel}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {products.length === 0 ? (
              <p className="text-foreground/60 text-center py-8">{t.noProducts}</p>
            ) : (
              <div className="space-y-4">
                {products.map((product: any) => (
                  <div
                    key={product.id}
                    className="bg-card border border-border rounded-lg p-4 flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{product.name}</h3>
                      <p className="text-sm text-foreground/60">{product.description}</p>
                      <p className="text-lg font-bold text-primary mt-2">
                        R$ {(product.price / 100).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEditProduct(product)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        onClick={() => handleDeleteProduct(product.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">{t.orders}</h2>
            {orders.length === 0 ? (
              <p className="text-foreground/60 text-center py-8">{t.noOrders}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        {t.orderNumber}
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        {t.customer}
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        {t.email}
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        {t.total}
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        {t.status}
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        {t.date}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order: any) => (
                      <tr key={order.id} className="border-b border-border hover:bg-accent">
                        <td className="py-3 px-4 text-foreground">{order.orderNumber}</td>
                        <td className="py-3 px-4 text-foreground">{order.customerName}</td>
                        <td className="py-3 px-4 text-foreground">{order.customerEmail}</td>
                        <td className="py-3 px-4 font-semibold text-primary">
                          R$ {(order.total / 100).toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.paymentStatus === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : order.paymentStatus === 'failed'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-foreground">
                          {new Date(order.createdAt).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
