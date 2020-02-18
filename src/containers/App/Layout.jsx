import React from 'react';

import Menu from 'modules/Menu';

const Layout = ({ children }) => (
  <section>
    <main>{children}</main>

    <aside>
      <Menu />
    </aside>
  </section>
);

export default Layout;
