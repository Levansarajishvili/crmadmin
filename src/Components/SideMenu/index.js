import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          // {
          //   label: "Dashbaord",
          //   icon: <AppstoreOutlined />,
          //   key: "/",
          // },
          // {
          //   label: "Inventory",
          //   key: "/inventory",
          //   icon: <ShopOutlined />,
          // },
          {
            label: "შეკვეთები",
            key: "/orders",
            icon: <ShoppingCartOutlined />,
          },
          {
            label: "მომხმარებლები",
            key: "/customers",
            icon: <UserOutlined />,
          },
          {
            label: "სტატისტიკა",
            key: "/chart",
            icon: <AreaChartOutlined/> ,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
