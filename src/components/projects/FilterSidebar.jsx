import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Tag, DollarSign, ListFilter } from 'lucide-react';

const categories = [
  { id: "icp_development", label: "ICP Development" },
  { id: "web_development", label: "Web Development" },
  { id: "blockchain", label: "Blockchain" },
  { id: "design", label: "Design" },
  { id: "ai_ml", label: "AI/ML" },
];

const skills = ["React", "Motoko", "Rust", "TypeScript", "Figma"];

export default function FilterSidebar({ filters, setFilters }) {
  const handleCategoryChange = (categoryId) => {
    setFilters(f => ({ ...f, category: f.category === categoryId ? "all" : categoryId }));
  };

  const handleSkillChange = (skill) => {
    setFilters(f => ({
      ...f,
      skills: f.skills.includes(skill)
        ? f.skills.filter(s => s !== skill)
        : [...f.skills, skill]
    }));
  };

  return (
    <aside className="w-[320px] h-full bg-white border-r border-gray-200/80 p-6 flex-col hidden lg:flex">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
                <ListFilter className="w-5 h-5" />
                Filters
            </h2>
            <Button variant="ghost" size="sm" onClick={() => setFilters({ searchTerm: "", category: "all", budget: [0, 10000], skills: [] })}>
                Clear all
            </Button>
        </div>

        <div className="space-y-6">
            <div>
                <h3 className="text-sm font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                    {categories.map((cat) => (
                        <div key={cat.id} className="flex items-center space-x-2">
                            <Checkbox 
                                id={cat.id} 
                                checked={filters.category === cat.id}
                                onCheckedChange={() => handleCategoryChange(cat.id)}
                            />
                            <label htmlFor={cat.id} className="text-sm font-medium leading-none cursor-pointer">
                                {cat.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="border-t pt-6">
                <h3 className="text-sm font-semibold mb-3">Budget Range</h3>
                <Slider
                    defaultValue={[0, 10000]}
                    max={10000}
                    step={500}
                    value={filters.budget}
                    onValueChange={(value) => setFilters(f => ({...f, budget: value}))}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>${filters.budget[0]}</span>
                    <span>${filters.budget[1]}+</span>
                </div>
            </div>

            <div className="border-t pt-6">
                <h3 className="text-sm font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                        <Button
                            key={skill}
                            variant={filters.skills.includes(skill) ? "default" : "outline"}
                            size="sm"
                            className="text-xs px-3 py-1"
                            onClick={() => handleSkillChange(skill)}
                        >
                            {skill}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    </aside>
  );
}