import { useParams } from "react-router-dom"
import { useContext } from "react"
import { AlgorithmContext } from "@/App"
import OverviewCard from "@components/OverviewCard"

export default function Overview () {

  const navigation = useContext(AlgorithmContext);
  const { category } = useParams()

  const items = category ? navigation.find((item) => item.name.toUpperCase() === category.toUpperCase())?.submenu : navigation

  return (            
    <div className="px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="px-5 py-6 bg-white rounded-lg shadow sm:px-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {items?.map((item) => (
            <OverviewCard key={item.name} item={item}/>
          ))}
        </div>
      </div>
    </div>
  )
}