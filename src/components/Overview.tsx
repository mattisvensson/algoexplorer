import { useParams } from "react-router-dom"
import { useContext } from "react"
import { NavigationContext } from "@/App"
import OverviewCard from "@components/OverviewCard"

export default function Overview () {

  const navigation = useContext(NavigationContext);
  const { category } = useParams()

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {navigation.map((item) => {
        if (category) {
          if (item.name.toUpperCase() === category?.toUpperCase()) {
            return (
              <>
                {item.submenu?.map((subitem) => (
                  <OverviewCard key={subitem.name} item={subitem}/>
                ))}
              </>
            )
          }
        } else {
          return (
            <OverviewCard key={item.name} item={item}/>
          )
        }
      })}
    </div>
  )
}