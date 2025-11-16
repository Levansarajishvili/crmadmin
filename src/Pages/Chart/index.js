import { Card, Space, Statistic, Typography } from "antd";
import { ShoppingCartOutlined, UserOutlined, DollarCircleOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useData } from "../../context/DataContext";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function Dashboard() {
  const { orders, customers, inventory } = useData();

  const revenue = orders.reduce((acc, item) => acc + (item.total || 0), 0);

  // Bar Chart Data
  const barChartData = [
    { name: 'შეკვეთები', value: orders.length, fill: '#1890ff' },
    { name: 'მომხმარებლები', value: customers.length, fill: '#52c41a' },
    { name: 'პროდუქტები', value: inventory.length, fill: '#faad14' },
  ];

  // Line Chart Data
  const lineChartData = [
    { month: 'იანვარი', შეკვეთები: 12, მომხმარებლები: 5 },
    { month: 'თებერვალი', შეკვეთები: 19, მომხმარებლები: 10 },
    { month: 'მარტი', შეკვეთები: 15, მომხმარებლები: 8 },
    { month: 'აპრილი', შეკვეთები: 25, მომხმარებლები: 15 },
    { month: 'მაისი', შეკვეთები: 22, მომხმარებლები: 18 },
    { month: 'ივნისი', შეკვეთები: orders.length, მომხმარებლები: customers.length },
  ];

  // Pie Chart Data
  const pieChartData = [
    { name: 'შეკვეთები', value: orders.length },
    { name: 'მომხმარებლები', value: customers.length },
    { name: 'პროდუქტები', value: inventory.length },
  ];

  const COLORS = ['#1890ff', '#52c41a', '#faad14'];

  return (
    <Space size={20} direction="vertical" style={{ width: '100%' }}>
      <Typography.Title level={4}>სტატისტიკა</Typography.Title>
      
      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <Card>
          <Statistic
            title="შეკვეთები"
            value={orders.length}
            prefix={<ShoppingCartOutlined />}
            valueStyle={{ color: '#3f8600' }}
          />
        </Card>
        <Card>
          <Statistic
            title="მომხმარებლები"
            value={customers.length}
            prefix={<UserOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
        <Card>
          <Statistic
            title="პროდუქტები"
            value={inventory.length}
            prefix={<ShoppingOutlined />}
            valueStyle={{ color: '#faad14' }}
          />
        </Card>
        <Card>
          <Statistic
            title="შემოსავალი"
            value={revenue}
            prefix={<DollarCircleOutlined />}
            valueStyle={{ color: '#cf1322' }}
            precision={2}
            suffix="$"
          />
        </Card>
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
        <Card title="სტატისტიკა (Bar Chart)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#1890ff" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        
        <Card title="ტრენდები (Line Chart)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="შეკვეთები" stroke="#1890ff" strokeWidth={2} />
              <Line type="monotone" dataKey="მომხმარებლები" stroke="#52c41a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="განაწილება (Pie Chart)">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry.name}: ${entry.value}`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </Space>
  );
}

export default Dashboard;