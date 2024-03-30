import { Link } from "react-router-dom"

export default function OverviewCard({ item }: {item: SubnavigationItem}) {
  return (
    <Link to={`/${item.href}`} className="flex items-center justify-center w-full text-center transition-all border border-gray-900 rounded-md aspect-square hover:scale-105 hover:shadow-md">
      {item.name}
    </Link>
  )
}