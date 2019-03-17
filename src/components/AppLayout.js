import React from 'react';
import { Col } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppLayout = ({ children }) => {
  return (
    <div style={{ backgroundColor: '#f8f9fa', width: '100vw', height: '100vh' }}>
      <Col sm="12" md={{ size: 6, offset: 3 }} style={{ padding: 0 }}>
        {children}
      </Col>

      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AppLayout;
