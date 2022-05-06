import React, { Suspense } from 'react'

import { Spin } from 'antd'
import { SyncOutlined } from '@ant-design/icons'

//-----------------------|| LOADABLE - LAZY LOADING ||-----------------------//

const Loadable = Component => props =>
  (
    <Suspense fallback={<Spin indicator={<SyncOutlined style={{ fontSize: 50 }} spin />} />}>
      <Component {...props} />
    </Suspense>
  )

export default Loadable
