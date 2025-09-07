'use client'

import { ShiftCard } from "@/components/card/shift-card";
import { Search, MapPin, Filter, ShoppingCart, Heart, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useFetchProducts } from "@/hooks/queries/useProductQuery";
import MapboxMap from "@/components/map/mapbox";
import { Product } from "@/types/product";
import { getUserLocation } from "@/utils/getLocation";
import { getDistance } from "@/utils/getDistance";

const MyPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });

  
  useEffect(() => {
    (async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
        console.log("Location:", location);
      } catch (err) {
        console.error("Location error:", err);
      }
    })();
  }, []);

  
  const { data: products = [] } = useFetchProducts();

  const categories = ["all", "Food & Beverages", "Electronics", "Fashion", "Crafts", "Books", "Sports"];

  const filteredProducts = products.filter((product: Product) => 
    (selectedCategory === "all" || product.category === selectedCategory) &&
    (searchQuery === "" || product.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const productsWithDistance = filteredProducts.map((product: Product) => ({
    ...product,
    distance: getDistance(
      userLocation.latitude,
      userLocation.longitude,
      product.latitude,
      product.longitude
    ),
  }));

  return (
    <div className="h-full w-full">
      {/* Header Section */}
      <div className="backdrop-blur-sm sticky">
        <div className="mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Marketplace
              </h1>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>Bangalore, India</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative flex-1 mx-auto w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search for products near you..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-11 text-sm bg-background border-border focus:border-primary"
              />
              <Button size="sm" className="absolute right-1 top-1 h-9 px-3">
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap text-xs h-8 px-3 capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-7 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-5">
            <MapboxMap
              points={filteredProducts.map((product: Product) => ({
                id: product.id,
                latitude: product.latitude,
                longitude: product.longitude,
                title: product.title,
                price: product.price,
              }))}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {searchQuery ? `Results for "${searchQuery}"` : 'Products Near You'}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {filteredProducts.length} items found
                </p>
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                Sort by Distance
              </Button>
            </div>

            <div className="grid md:grid-cols-1 gap-6">
              {productsWithDistance.map((product: Product) => (
                <ShiftCard
                  key={product.id}
                  className="bg-card border hover:shadow-lg transition-all duration-300"
                  title={product.title}
                  titleIcon={
                    <div className="flex items-center gap-1">
                      <Badge variant="secondary" className="text-xs px-2 py-0.5">
                        {product.category}
                      </Badge>
                    </div>
                  }
                  mainImageSrc={product.imageUrl}
                  mainImageAlt={product.title}
                  bottomTitle={product.sellerEmail}
                  bottomTitleIcon={
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{4.5}</span>
                      <span className="text-xs text-muted-foreground">({20})</span>
                    </div>
                  }
                  bottomDescription={
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary">{product.price}</span>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span className="text-xs">{product.distance} km</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  actions={[
                    {
                      label: "Add to Cart",
                      icon: ShoppingCart,
                      onClick: () => alert(`Added ${product.title} to cart!`),
                    },
                    {
                      label: "Save",
                      icon: Heart,
                      onClick: () => alert(`Saved ${product.title}!`),
                    }
                  ]}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;