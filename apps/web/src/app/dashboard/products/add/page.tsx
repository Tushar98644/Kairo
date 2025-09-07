"use client"

import {
  Camera,
  MapPin,
  Package,
  Sparkles,
  Tag,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ToolbarExpandable } from "@/components/ui/toolbar"
import FileUpload from "@/components/ui/file-upload"

const productSteps = [
  {
    id: "basic",
    title: "Basic Information",
    description: "Add your product name, description, and category.",
    icon: Package,
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="product-name" className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Product Name
          </Label>
          <Input 
            id="product-name" 
            placeholder="e.g., Fresh Organic Tomatoes" 
            className="h-10 text-xs bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-lg focus:border-indigo-500 dark:focus:border-indigo-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Description
          </Label>
          <Textarea 
            id="description" 
            placeholder="Describe your product in detail..."
            rows={3}
            className="text-xs bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-lg focus:border-indigo-500 dark:focus:border-indigo-400 resize-none"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category" className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Category
          </Label>
          <select className="w-full h-10 px-3 text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:border-indigo-500 dark:focus:border-indigo-400 text-zinc-900 dark:text-zinc-100">
            <option>Food & Beverages</option>
            <option>Electronics</option>
            <option>Fashion & Clothing</option>
            <option>Home & Garden</option>
            <option>Sports & Outdoors</option>
            <option>Books & Media</option>
          </select>
        </div>
        <Button className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors">
          <Package className="w-4 h-4 mr-2" />
          Continue to Pricing
        </Button>
      </div>
    ),
  },
  {
    id: "pricing",
    title: "Pricing & Location",
    description: "Set your price and location for nearby buyers to find you.",
    icon: Tag,
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="price" className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Price
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xs text-zinc-500">₹</span>
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              className="pl-8 h-10 text-xs bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-lg focus:border-indigo-500 dark:focus:border-indigo-400"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="location" className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Location
          </Label>
          <Input 
            id="location" 
            placeholder="e.g., Indiranagar, Bangalore" 
            className="h-10 text-xs bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-lg focus:border-indigo-500 dark:focus:border-indigo-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock" className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Available Quantity
          </Label>
          <Input 
            id="stock" 
            type="number"
            placeholder="1" 
            className="h-10 text-xs bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-lg focus:border-indigo-500 dark:focus:border-indigo-400"
          />
        </div>
        <Button 
          variant="outline" 
          className="w-full h-10 bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold rounded-lg transition-colors"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Use Current Location
        </Button>
      </div>
    ),
  },
  {
    id: "images",
    title: "Upload Images",
    description: "Add high-quality photos to showcase your product.",
    icon: Camera,
    content: (
      <div className="space-y-4">
        <FileUpload/>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Camera className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-800 dark:text-indigo-300">Photo Tips</span>
          </div>
          <ul className="text-xs text-indigo-700 dark:text-indigo-400 leading-relaxed space-y-1">
            <li>• Use natural lighting for best results</li>
            <li>• Include multiple angles of your product</li>
            <li>• Ensure images are clear and high-resolution</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "ai-enhance",
    title: "AI Enhancement",
    description: "Let AI help optimize your product listing for better visibility.",
    icon: Sparkles,
    content: (
      <div className="space-y-4">
        <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span className="text-xs font-semibold text-violet-800 dark:text-violet-300">AI Suggestions Ready</span>
          </div>
          <p className="text-xs text-violet-700 dark:text-violet-400 leading-relaxed mb-3">
            Our AI has analyzed your product and generated optimized content.
          </p>
          <div className="space-y-3">
            <div className="bg-white dark:bg-violet-900/30 rounded-lg p-3 border border-violet-200 dark:border-violet-700">
              <Label className="text-xs font-semibold text-violet-900 dark:text-violet-200 block mb-2">
                AI-Generated Tags
              </Label>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-violet-100 dark:bg-violet-800 text-violet-800 dark:text-violet-200 text-xs rounded-full">fresh</span>
                <span className="px-2 py-1 bg-violet-100 dark:bg-violet-800 text-violet-800 dark:text-violet-200 text-xs rounded-full">organic</span>
                <span className="px-2 py-1 bg-violet-100 dark:bg-violet-800 text-violet-800 dark:text-violet-200 text-xs rounded-full">local</span>
                <span className="px-2 py-1 bg-violet-100 dark:bg-violet-800 text-violet-800 dark:text-violet-200 text-xs rounded-full">healthy</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Suggested Price Range
          </Label>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
            <div className="text-xs text-emerald-700 dark:text-emerald-400">
              Based on similar products: <span className="font-semibold">₹45 - ₹65</span>
            </div>
          </div>
        </div>

        <Button className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors">
          <Upload className="w-4 h-4 mr-2" />
          Publish Product
        </Button>
      </div>
    ),
  },
]

const AddProductPage = () => {
  return (
    <div className="w-full">
      <div className="mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800">
            AI-Powered Listing
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
            Add New Product
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed text-sm">
            Create your product listing with AI assistance. Get optimized descriptions, 
            smart pricing suggestions, and enhanced visibility for nearby buyers.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Product Form Section */}
          <section className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Product Details
              </h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                4-step process with AI enhancement
              </p>
            </div>

            <ToolbarExpandable steps={productSteps} badgeText="ADD PRODUCT" />
          </section>

          {/* Benefits Section */}
          <section>
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Why Use Our Platform?
              </h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Benefits of listing your products with us
              </p>
            </div>

            <div className="grid gap-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    AI-Powered Optimization
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Get smart suggestions for pricing, descriptions, and tags to maximize visibility
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    Local Discovery
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Your products appear on interactive maps for nearby customers to find easily
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-violet-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    Smart Search Integration
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    RAG-powered search ensures your products match customer queries perfectly
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    Secure Transactions
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Built-in payment processing with buyer protection and seller guarantees
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    Real-time Analytics
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Track views, inquiries, and sales with detailed performance insights
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    Instant Notifications
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Get notified immediately when customers show interest or make purchases
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AddProductPage;