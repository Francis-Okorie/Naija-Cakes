import React from 'react'
import HeroBanner from '../components/HeroBanner'
import Categories from '../components/Categories'
import TopPick from '../components/TopPick'
import BottomBanner from '../components/BottomBanner'
import Newsletter from '../components/Newsletter'
import Occasion from '../components/Occasion'
import Signature from '../components/Signature'
import LayeredCard from '../components/LayerCard'
import Abouticons from '../components/Abouticons'

const Home = () => {
  return (
    <div>
        <div className="flex flex-col">
            <HeroBanner/>
            <TopPick/>
            <Occasion/>
            <LayeredCard/>
            <Abouticons/>
            <Newsletter/>
        </div>
    </div>
  )
}

export default Home