import React, { useState,useEffect } from "react";
import {Link, Outlet,useLocation} from "react-router-dom"
import "./App.css"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Camera1 from "./pages/Camera1";
import ProjectTitle from "./components/ProjectTitle";
const { Header, Sider, Content } = Layout;


const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
    // Step 2: Use useLocation to get current path
    const location = useLocation();
  
    // Step 3: Dynamically set the title based on route
    const [title, setTitle] = useState("CCTV Camera Surveillance");
  
    useEffect(() => {
      switch (location.pathname) {
        case "/camera1":
          setTitle("Camera 1 Surveillance");
          break;
        case "/camera2":
          setTitle("Shopping Mall Camera Surveillance");
          break;
        case "/camera3":
          setTitle("Shop Live Camera Surveillance");
          break;
        default:
          setTitle("CCTV Camera Surveillance");
      }
    }, [location.pathname]);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              key: "1",
              icon: <VideoCameraOutlined />,
              label: <Link to = "/camera1">Camera 1</Link>
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: <Link to = "/camera2">Camera 2</Link>,
            },
            {
              key: "3",
              icon: <VideoCameraOutlined />,
              label: <Link to = "/camera3">Camera 3</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="menu-button">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </div>
          <ProjectTitle title={title}/>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginRight: "20px",
            }}
            className=""
          >
            CCTV Camera Surveillance
          </div>
        </Header>
        <Content
          style={{
            margin: "4px",
            padding: 5,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
        <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
