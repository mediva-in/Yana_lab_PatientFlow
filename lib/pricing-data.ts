// Pricing data extracted from hospitals-client/pricing.csv
// Only showing top 5 tests for each category to maintain good UX

export interface PricingItem {
  name: string
  price: number
}

export interface ScanCategory {
  name: string
  tests: PricingItem[]
}

export const scanCategories: Record<string, ScanCategory> = {
  "X-Ray": {
    name: "X-Ray",
    tests: [
      { name: "Chest AP View", price: 450 },
      { name: "Chest PA View", price: 450 },
      { name: "Cervical Spine AP View", price: 450 },
      { name: "Lumbar Spine AP View", price: 450 },
      { name: "Pelvis AP View", price: 450 }
    ]
  },
  "Ultrasound": {
    name: "Ultrasound", 
    tests: [
      { name: "EARLY PREGNANCY SCAN", price: 2000 },
      { name: "NT SCAN", price: 2500 },
      { name: "ANOMALY SCAN", price: 4500 },
      { name: "GROWTH SCAN", price: 2500 },
      { name: "ABDOMEN & PELVIS", price: 2200 }
    ]
  }
}

// Helper function to get all test names for search functionality
export const getAllTestNames = (): string[] => {
  return Object.values(scanCategories).flatMap(category => 
    category.tests.map(test => test.name)
  )
}

// Helper function to get test price by name
export const getTestPrice = (testName: string): number | null => {
  for (const category of Object.values(scanCategories)) {
    const test = category.tests.find(t => t.name === testName)
    if (test) {
      return test.price
    }
  }
  return null
}

// Helper function to get test category by name
export const getTestCategory = (testName: string): string | null => {
  for (const [categoryName, category] of Object.entries(scanCategories)) {
    const test = category.tests.find(t => t.name === testName)
    if (test) {
      return categoryName
    }
  }
  return null
} 