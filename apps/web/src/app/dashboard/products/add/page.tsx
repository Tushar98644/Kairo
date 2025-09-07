"use client";

import { useEffect, useState } from "react";
import { ToolbarExpandable } from "@/components/ui/toolbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Camera, Package, Sparkles, Tag, Upload } from "lucide-react";
import FileUpload from "@/components/ui/file-upload";
import { uploadFileToS3 } from "@/app/actions/upload";
import { useCreateProduct } from "@/hooks/mutations/useProductMutation";
import { getUserLocation } from "@/utils/getLocation";

const AddProductPage = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageKey, setImageKey] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 0, longitude: 0 });

  useEffect(() => {
    (async () => {
      try {
        const location = await getUserLocation();
        setLocation(location);
        console.log("Location:", location);
      } catch (err) {
        console.error("Location error:", err);
      }
    })();
  }, []);

  const { mutate: publishProduct } = useCreateProduct();

  const uploadImage = async (file: File) => {
    try {
      const res = await uploadFileToS3(file);
      if (res.success && res.key) {
        setImageKey(res.key);
        console.log("Image uploaded successfully with key:", imageKey);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handlePublish = async () => {
    try {
      const data = {
        title,
        description,
        price,
        imageKey,
        category,
        latitude: location.latitude,
        longitude: location.longitude,
      };

      publishProduct(data);
      console.log("Product published successfully");
    } catch (error) {
      console.error("Error publishing product:", error);
    }
  };

  const productSteps = [
    {
      id: "basic",
      title: "Basic Information",
      description: "Add your product name, description, and category.",
      icon: Package,
      content: (
        <div className="space-y-4">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="product-name" className="text-xs font-semibold">
              Product Name
            </Label>
            <Input
              id="product-name"
              placeholder="e.g., Fresh Organic Tomatoes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 text-xs"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs font-semibold">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your product..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-xs resize-none"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-xs font-semibold">
              Category
            </Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-10 px-3 text-xs rounded-lg"
            >
              <option value="">Select category</option>
              <option>Food & Beverages</option>
              <option>Electronics</option>
              <option>Fashion & Clothing</option>
              <option>Home & Garden</option>
              <option>Sports & Outdoors</option>
              <option>Books & Media</option>
            </select>
          </div>

          <Button className="w-full h-10">
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
          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-xs font-semibold">
              Price
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                ₹
              </span>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="pl-8 h-10 text-xs"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-xs font-semibold">
              Location
            </Label>
            <Input
              id="location"
              placeholder="e.g., Indiranagar, Bangalore"
              value={
                location.latitude && location.longitude
                  ? `${location.latitude}, ${location.longitude}`
                  : ""
              }
              readOnly
              className="h-10 text-xs"
            />
          </div>
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
          <FileUpload
            onUpload={(file) => uploadImage(file)}
            acceptedFileTypes={["image/*"]}
            maxFileSize={5 * 1024 * 1024}
            onFileRemove={() => setImageKey("")}
          />
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Camera className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-800 dark:text-indigo-300">
                Photo Tips
              </span>
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
      description:
        "Let AI help optimize your product listing for better visibility.",
      icon: Sparkles,
      content: (
        <div className="space-y-4">
          <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <span className="text-xs font-semibold text-violet-800 dark:text-violet-300">
                AI Suggestions Ready
              </span>
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
                  <span className="px-2 py-1 bg-violet-100 dark:bg-violet-800 text-violet-800 dark:text-violet-200 text-xs rounded-full">
                    fresh
                  </span>
                  <span className="px-2 py-1 bg-violet-100 dark:bg-violet-800 text-violet-800 dark:text-violet-200 text-xs rounded-full">
                    organic
                  </span>
                  <span className="px-2 py-1 bg-violet-100 dark:bg-violet-800 text-violet-800 dark:text-violet-200 text-xs rounded-full">
                    local
                  </span>
                  <span className="px-2 py-1 bg-violet-100 dark:bg-violet-800 text-violet-800 dark:text-violet-200 text-xs rounded-full">
                    healthy
                  </span>
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
                Based on similar products:{" "}
                <span className="font-semibold">₹45 - ₹65</span>
              </div>
            </div>
          </div>

          <Button onClick={handlePublish} className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Publish Product
          </Button>
        </div>
      ),
    },
  ];

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
            Create your product listing with AI assistance. Get optimized
            descriptions, smart pricing suggestions, and enhanced visibility for
            nearby buyers.
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
                    Get smart suggestions for pricing, descriptions, and tags to
                    maximize visibility
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
                    Your products appear on interactive maps for nearby
                    customers to find easily
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
                    RAG-powered search ensures your products match customer
                    queries perfectly
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
                    Built-in payment processing with buyer protection and seller
                    guarantees
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
                    Track views, inquiries, and sales with detailed performance
                    insights
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
                    Get notified immediately when customers show interest or
                    make purchases
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
