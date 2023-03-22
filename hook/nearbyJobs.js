import { useState, useEffect } from "react"
import axios from "axios"

const nearbyJobs = (endpoint, query) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": "6a1cb669aemsha1aad39780236c6p177d45jsn9bbb4ab405a4",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  }

  const nearbyJobs = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000))
      const response = await axios.request(options)
      setData(response.data.data)
      setIsLoading(false)
    } catch (error) {
      setError(error)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    nearbyJobs()
  }, [])

  const refetch = () => {
    setIsLoading(true)
    nearbyJobs()
  }

  return { data, isLoading, error, refetch }
}

export default nearbyJobs
