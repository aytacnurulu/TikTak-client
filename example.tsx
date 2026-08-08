import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Card from "@/shared/components/Card";
import QuantitySelector from "@/shared/components/QuantitySelector";
import Container from "@/shared/components/Container";
import ProductCard from "@/shared/components/ProductCard";
import type { Product } from "@/shared/components/ProductCard/ProductCard.types";

const mockProduct: Product = {
  id: "1",
  name: "Qizil əhmədi alması 1 kq",
  price: 3.3,
  image: "/images/apple.png",
  badge: "S",
};

export default function ExamplesPage() {
  return (
    <Container className="py-10 space-y-12">
      {/* ---------- BUTTON ---------- */}
      {/* variant = rəng, size = ölçü (h/padding/font birlikdə gəlir) */}
      <section className="space-y-3">
        <h2 className="font-bold">Button</h2>
        <div className="flex gap-3 flex-wrap">
          <Button variant="primary" size="md">
            Adi düymə
          </Button>
          <Button variant="danger" size="sm">
            Kiçik, qırmızı
          </Button>
          <Button variant="primary" size="lg" fullWidth>
            Tam en (parent-dən asılı)
          </Button>
          <Button variant="primary" size="md" loading>
            Yüklənir...
          </Button>
          <Button variant="primary" size="md" disabled>
            Deaktiv
          </Button>
        </div>
      </section>

      {/* ---------- INPUT ---------- */}
      {/* label = üstdə yazı, error = alt qırmızı mesaj, rightElement = daxilinə element (məs. düymə) */}
      <section className="space-y-3">
        <h2 className="font-bold">Input</h2>
        <Input label="Ad" placeholder="Ad, Soyad" />
        <Input label="Email" error="Email düzgün formatda deyil" />
        <Input
          placeholder="E-mail daxil edin"
          rightElement={
            <Button variant="primary" size="sm" className="!h-9">
              Göndər
            </Button>
          }
        />
      </section>

      {/* ---------- CARD ---------- */}
      {/* sadə "qutu" - içinə istənilən şeyi qoya bilərsən (composition) */}
      <section className="space-y-3">
        <h2 className="font-bold">Card</h2>
        <Card className="p-4">Sadə mətn kartın içində</Card>
      </section>

      {/* ---------- QUANTITY SELECTOR ---------- */}
      {/* öz daxili state-i var (sayı özü izləyir), onChange ilə xaricə xəbər verir */}
      <section className="space-y-3">
        <h2 className="font-bold">QuantitySelector</h2>
        <QuantitySelector
          initialValue={1}
          min={0}
          max={10}
          onChange={(val) => console.log("yeni say:", val)}
        />
      </section>

      {/* ---------- PRODUCT CARD ---------- */}
      {/* server component - içində client hissə (AddToCartControl) ayrıca gizlənib */}
      <section className="space-y-3">
        <h2 className="font-bold">ProductCard</h2>
        <div className="w-[187px]">
          <ProductCard
            id={mockProduct.id}
            image={mockProduct.image}
            title={mockProduct.name}
            price={String(mockProduct.price)}
            actionSlot={
              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={() => console.log("səbətə əlavə edildi")}
              >
                Səbətə əlavə et
              </Button>
            }
          />
        </div>
      </section>
    </Container>
  );
}
