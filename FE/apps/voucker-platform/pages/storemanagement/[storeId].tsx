import React from 'react'
import { useRouter } from 'next/router'
const StoreManagement= () => {
  const router = useRouter();
  const productId = router.query.storeId;
  return (
    <div>store:{productId}</div>
  )
}

export default StoreManagement