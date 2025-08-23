import { Outlet, useLocation } from 'react-router-dom';
import MobileNavbar from '../components/layout/MobileNavbar';
import MobileBottomTabs from '../components/layout/MobileBottomTabs';
import DesktopSidebar from '../components/layout/DesktopSidebar';
import { routes } from '../routes';

const Layout = () => {
  const location = useLocation();
  
  const getCurrentRoute = () => {
    let currentRoute = routes.find(route => route.path === location.pathname);
    if (!currentRoute) {
      currentRoute = routes.find(route => {
        if (route.children && location.pathname.startsWith(route.path)) {
          return true;
        }
        return false;
      });
    }
    
    if (!currentRoute) {
      currentRoute = routes.find(route => route.path === '*');
    }
    
    return currentRoute;
  };
  
  const currentRoute = getCurrentRoute();
  const showNavigation = currentRoute?.showInNav;
  
  // Check if current route is home page
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] text-white">
      {/* Mobile Navigation - Hide on home page */}
      {!isHomePage && (
        <>
          <MobileNavbar />
          <MobileBottomTabs />
        </>
      )}
      
      {/* Desktop Sidebar - Hide on home page */}
      {!isHomePage && <DesktopSidebar />}
      
      {/* Main Content Area */}
      <main className={`
        ${!isHomePage ? 'pt-14 pb-20 md:pt-2 md:pb-0 md:pr-72' : ''}
        min-h-screen
      `}>
        <div className={`
          ${!isHomePage 
            ? 'md:max-w-md md:mx-auto md:my-4 md:rounded-2xl md:shadow-2xl md:bg-gradient-to-b md:from-[var(--bg-primary)]/50 md:to-[var(--bg-secondary)]/50 md:backdrop-blur-lg md:border md:border-white/10 md:min-h-[calc(100vh-2rem)] md:overflow-hidden' 
            : ''
          }
        `}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;