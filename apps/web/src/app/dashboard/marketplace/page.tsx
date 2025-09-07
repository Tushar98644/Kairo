'use client'

import { ShiftCard } from "@/components/card/shift-card";
import { Search, MapPin, Filter, ShoppingCart, Heart, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import MapboxMap from "@/components/map/mapbox";

const MyPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products = [
    {
      id: 1,
      title: "Fresh Organic",
      price: "$5.99",
      location: "2.3 km away",
      category: "Food",
      rating: 4.8,
      reviews: 24,
      seller: "Green Farm Co.",
      image: "/basic-img.png",
      description: "Locally grown organic tomatoes, perfect for salads and cooking"
    },
    {
      id: 2,
      title: "Vintage Leather",
      price: "$89.99",
      location: "1.8 km away",
      category: "Fashion",
      rating: 4.9,
      reviews: 18,
      seller: "Style Vintage",
      image: "/basic-img.png",
      description: "Premium quality vintage leather jacket in excellent condition"
    },
  ];

  const categories = ["all", "Food", "Electronics", "Fashion", "Crafts", "Books", "Sports"];

  const filteredProducts = products.filter(product => 
    (selectedCategory === "all" || product.category === selectedCategory) &&
    (searchQuery === "" || product.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
            <MapboxMap points={
              [
                {
                  id: 1,
                  latitude: 37.7749,
                  longitude: -122.4194,
                  title: 'San Francisco',
                  price: '$100'
                },
                {
                  id: 2,
                  latitude: 34.0522,
                  longitude: -118.2437,
                  title: 'Los Angeles',
                  price: '$200'
                },
                {
                  id: 3,
                  latitude: 40.7128,
                  longitude: -74.0060,
                  title: 'New York',
                  price: '$300'
                }
              ]
            }/>
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
              {filteredProducts.map((product) => (
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
                  mainImageSrc={product.image}
                  mainImageAlt={product.title}
                  bottomTitle={product.seller}
                  bottomTitleIcon={
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
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
                            <span className="text-xs">{product.location}</span>
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