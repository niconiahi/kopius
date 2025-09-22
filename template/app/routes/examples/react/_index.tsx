import { useEffect, useState } from "react"

export default function () {
  const [uuid, setUuid] = useState<string>("")

  useEffect(() => {
    const uuid = crypto.randomUUID()
    setUuid(uuid)
  }, [])

  return <h1 className="text-red-500">{uuid}</h1>
}
