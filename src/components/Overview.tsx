import { useParams } from "react-router-dom"
import { useContext } from "react"
import { NavigationContext } from "@/App"
import OverviewCard from "@components/OverviewCard"

export default function Overview () {

  const navigation = useContext(NavigationContext);
  const { category } = useParams()

  const items = category ? navigation.find((item) => item.name.toUpperCase() === category.toUpperCase())?.submenu : navigation

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {items?.map((item) => (
        <OverviewCard key={item.name} item={item}/>
      ))}
    </div>
  )
}