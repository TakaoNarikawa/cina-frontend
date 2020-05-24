import { Layout, Menu, Typography } from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { BrowserRouter as Router, Link, Route, Switch, useLocation } from "react-router-dom";
import Drawer from "src/components/molecules/Drawer";
import pages from "src/Pages";
import { HEADER_BACKGROUND_COLOR, SITE_BACKGROUND_COLOR } from "src/utils/color";
import styled from "styled-components";
import { CinaContext } from "./utils/provider";
import { BASE, FOOTER_HEIGHT, HEADER_HEIGHT, PAGE_SIDE_PADDING, X_LARGE } from "./utils/space";
import Logo from "src/resource/Logo.png";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const StyledHeader = styled(Header)`
  width: 100%;
  height: ${HEADER_HEIGHT};
  background-color: ${HEADER_BACKGROUND_COLOR};
  position: fixed;
  z-index: 1;

  padding-right: 0;
`;
const StyledFooter = styled(Footer)`
  // height: ${FOOTER_HEIGHT};
  padding-top: ${X_LARGE};
  padding-bottom: ${BASE};
  text-align: center;
  background-color: ${SITE_BACKGROUND_COLOR};
`;

const ContentWrapper = styled(Content)`
  min-height: calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT} - ${X_LARGE} - ${BASE});
  margin-top: ${HEADER_HEIGHT};
  padding: 0px ${PAGE_SIDE_PADDING};
`;

const StyledLayout = styled(Layout)`
  padding: 0px !important;
  background-color: ${SITE_BACKGROUND_COLOR};
`;

const PagePadding = styled.div`
  padding: ${X_LARGE} 0px;
`;

const ButtonWrapper = styled.button`
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`;

const LogoImg = styled.img`
  height: 31px;
  margin: 16px 24px 16px 0;
  float: left;
`;

const HamburgerIcon = styled(IoIosMenu)`
  color: white;
  width: 36px;
  height: 36px;
  margin: 10px;
`;

const Routes: React.FC = () => {
  const { pathname } = useLocation();
  const { token } = useContext(CinaContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("token", token);
  }, [pathname]);
  return (
    <Switch>
      {pages.map(({ path, noPadding, View }, i) => (
        <Route key={i} exact path={path}>
          {noPadding ? (
            <View />
          ) : (
            <PagePadding>
              <View />
            </PagePadding>
          )}
        </Route>
      ))}
    </Switch>
  );
};

const App: React.FC = () => {
  const [drawerVidible, setDrawerVisible] = useState(false);
  const handleOpenDrawer = useCallback(() => setDrawerVisible(true), []);
  const handleCloseDrawer = useCallback(() => setDrawerVisible(false), []);
  return (
    <Router>
      <StyledLayout>
        <StyledHeader>
          <Link to="/">
            <LogoImg src={Logo} />
          </Link>

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "0px", float: "right" }}
          >
            <Menu.Item key="1" disabled={true} style={{ backgroundColor: HEADER_BACKGROUND_COLOR }}>
              <ButtonWrapper onClick={handleOpenDrawer}>
                <HamburgerIcon />
              </ButtonWrapper>
            </Menu.Item>
          </Menu>
        </StyledHeader>

        <Drawer onClose={handleCloseDrawer} visible={drawerVidible} />

        <ContentWrapper className="site-layout">
          <Routes />
        </ContentWrapper>

        <StyledFooter>
          <p>Copyright© 2020</p>
          <p>All Rights Reserve.</p>
        </StyledFooter>
      </StyledLayout>
    </Router>
  );
};

export default App;
