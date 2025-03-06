import { Badge } from "@components/ui/badge";
import { Card, CardHeader, CardTitle } from "@components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@components/ui/hover-card";
import { Separator } from "@components/ui/separator";
import { formatDate } from "@lib/helpers";
import { IPAddress } from "@lib/types/ip-address";
import { useNavigate } from "react-router-dom";

type IPAddressCardProps = {
  item: IPAddress;
};

function IPAddressCard({ item }: IPAddressCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="cursor-pointer py-4 bg-zinc-900 hover:border-zinc-600"
      onClick={() => navigate(`/app/ip-address/${item.id}`)}
    >
      <CardHeader className="px-4">
        <CardTitle className="font-bold tracking-wide flex items-center flex-wrap">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  [{formatDate(item.created_at)}]
                </span>
                <span className="text-sm text-muted-secondary">{item.ip}</span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent align="start" className="w-80">
              <div className="space-5">
                <h4 className="font-bold">{item.label}</h4>
                <Separator className="my-2" />
                <div className="flex items-center justify-between">
                  <p>{item.comment}</p>
                  <Badge>{formatDate(item.created_at)}</Badge>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default IPAddressCard;
