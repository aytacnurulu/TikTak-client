"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Input from "../Input";
import { useSearchStore } from "@/shared/store/useSearchStore";
import { useDebounce } from "@/shared/hooks/useDebounce";
import Image from "next/image";

export default function SearchBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState(searchParams.get("search") ?? "");
    const [isOpen, setIsOpen] = useState(false);
    const debouncedQuery = useDebounce(query, 300);

    const { products, categories } = useSearchStore();

    useEffect(() => {
        const current = searchParams.get("search") ?? "";
        const next = debouncedQuery.trim();

        if (current === next) return;

        const params = new URLSearchParams(searchParams.toString());

        if (next.length >= 2) {
            params.set("search", next);
        } else {
            params.delete("search");
        }

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedQuery, pathname]);

    const q = debouncedQuery.trim().toLowerCase();

    const matchedCategories =
        q.length >= 2
            ? categories.filter((c) => c.name.toLowerCase().includes(q))
            : [];

    const matchedProducts =
        q.length >= 2
            ? products.filter((p) => p.title.toLowerCase().includes(q))
            : [];

    const hasResults = matchedCategories.length > 0 || matchedProducts.length > 0;

    return (
        <div className="relative">
            <Input
                placeholder="Axtarış"
                size="lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setTimeout(() => setIsOpen(false), 150)}
            />

            {isOpen && q.length >= 2 && (
                <div className="absolute top-full mt-1 w-full bg-white shadow-lg rounded-[10px] border border-gray-100 max-h-96 overflow-y-auto z-50">
                    {!hasResults && (
                        <div className="p-3 text-sm text-gray-400">Nəticə tapılmadı</div>
                    )}

                    {matchedCategories.map((c) => (
                        <Link
                            key={`cat-${c.id}`}
                            href={`/category/${c.id}`}
                            className="flex items-center gap-3 p-2 hover:bg-gray-50"
                        >
                            <span className="text-sm font-medium">{c.name}</span>
                        </Link>
                    ))}

                    {matchedProducts.map((p) => (
                        <Link
                            key={`prod-${p.id}`}
                            href={`/category/${p.category.id}/product/${p.id}`}
                            className="flex items-center gap-3 p-2 hover:bg-gray-50"
                        >
                            <Image
                                src={p.img_url || "/image/apple.svg"}
                                alt={p.title}
                                width={40}
                                height={40}
                                className="w-10 h-10 object-cover rounded"
                            />
                            <div>
                                <p className="text-sm font-medium">{p.title}</p>
                                <p className="text-xs text-gray-500">{p.price} AZN</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}