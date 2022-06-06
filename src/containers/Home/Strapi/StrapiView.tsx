import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'
import apiStrapi, { Product } from '~/services/apiStrapi'

type Props = {}

const StrapiView = (props: Props) => {
  const [isAuthenticated, setisAuthenticated] = useState(false)
  const [isLogin, setisLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [products, setproducts] = useState<{ attributes: Product, id: number }[]>([])

  const handleLogout = () => {
    setisAuthenticated(false)
  }
  const handleSubmit = async () => {
    if (isLogin) {
      const result = await apiStrapi.useLogin({
        data: {
          identifier: email,
          password,
        }
      })
      console.log('result login', result)
    } else if (!!username && !!email && !!password) {
      const result = await apiStrapi.useRegister({
        data: {
          username,
          email,
          password,
        }
      })
      console.log('result register', result)
      
    }
    setisAuthenticated(true)
    setUsername('')
    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const products = await apiStrapi.useProductGet()
      setproducts(products.data.data)
    }
    fetchProduct()
  }, [])

  return (
    <div>
      <Typography variant="h6">Strapi</Typography>
      {isAuthenticated ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <>
          {isLogin ? 'Login' : 'Register'}
          <Button onClick={() => setisLogin(!isLogin)}>Change to {isLogin ? 'Register' : 'Login'}</Button>
          {!isLogin && (
            <TextField value={username} onChange={(e) => setUsername(e.currentTarget.value)} label="Username" />
          )}
          <TextField value={email} onChange={(e) => setEmail(e.currentTarget.value)} label="Email" />
          <TextField value={password} onChange={(e) => setPassword(e.currentTarget.value)} label="Password" />
          <Button onClick={handleSubmit}>Submit</Button>
        </>
      )}
      {products.map((product) => (
        <div key={product.id}>
          <Typography variant="body2">{product.attributes.product_name}</Typography>
        </div>
      ))}
    </div>
  )
}

export default StrapiView