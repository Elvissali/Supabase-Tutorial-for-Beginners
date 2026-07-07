import supabase from '../config/supabaseClient'
import { useState, useEffect } from 'react'
const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  
  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
      
      if (error) {
        setFetchError('Could not fetch smoothies')
        setSmoothies(null)
      }
      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }

    fetchSmoothies()
  }, [])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className="smoothies">
          {smoothies.map(smoothie => (
            <div key={smoothie.id} className="smoothie">
              <h3>{smoothie.title}</h3>
              <p>{smoothie.method}</p>
              <div className="rating">{smoothie.rating}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home