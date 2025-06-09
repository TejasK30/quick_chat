import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatGroupType } from "@/types"
import { GroupChatCardMenu } from "./GroupChatCardMenu"
import { Calendar, Key, Users } from "lucide-react"
import { Badge } from "../ui/badge"

export default function GroupChatCard({ group }: { group: ChatGroupType }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold truncate pr-2">
              {group.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="text-xs">
                <Users className="mr-1 h-3 w-3" />
                Group Chat
              </Badge>
            </div>
          </div>
          <GroupChatCardMenu group={group} />
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Key className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Passcode:</span>
            <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
              {group.passcode}
            </code>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>Created on {formatDate(group.created_at)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
