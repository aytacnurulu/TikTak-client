"use client";

import { useRouter } from "next/navigation";
import Card from "@/shared/components/Card";
import Button from "@/shared/components/Button";
import type { BasketTotalCountPanelProps } from "./types";

export default function BasketTotalCountPanel({
  total,
  disabled,
  title = "Yekun məbləğ",
}: BasketTotalCountPanelProps) {
  const router = useRouter();

  return (
    <div>
      <h2 className="text-lg font-bold text-dark mb-4">{title}</h2>

      <Card className="p-6">
        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Ümumi</span>
            <span>{total} AZN</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Çatırılma</span>
            <span>Pulsuz</span>
          </div>
        </div>

        <div className="mt-8 flex justify-between font-bold">
          <span>Yekun məbləğ</span>
          <span>{total} AZN</span>
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={disabled}
          className="mt-4"
          onClick={() => router.push("/checkout")}
        >
          Sifarişi tamamla
        </Button>
      </Card>
    </div>
  );
}
