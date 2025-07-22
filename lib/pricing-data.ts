// Pricing data fetched from API
// Services are categorized based on their scanCategory from the API

import { medivaApiClient, Service } from "./api-client/mediva-client";

export interface PricingItem {
  name: string;
  price: number;
}

export interface ScanCategory {
  name: string;
  tests: PricingItem[];
}

// Transform API data to match the expected format
export const transformApiDataToScanCategories = (
  services: Service[]
): Record<string, ScanCategory> => {
  // Group services by category
  const groupedServices = services.reduce((acc, service) => {
    const categoryName = service.scanCategory || "Scans";

    if (!acc[categoryName]) {
      acc[categoryName] = {
        name: categoryName,
        tests: [],
      };
    }

    acc[categoryName].tests.push({
      name: service.scanName,
      price: service.scanPrice,
    });

    return acc;
  }, {} as Record<string, ScanCategory>);

  return groupedServices;
};

// Helper function to get display name with category
export const getDisplayNameWithCategory = (
  scanName: string,
  scanCategories?: Record<string, ScanCategory>
): string => {
  // If scanCategories is provided, use it
  if (scanCategories) {
    for (const [categoryName, category] of Object.entries(scanCategories)) {
      if (category && category.tests && Array.isArray(category.tests)) {
        const test = category.tests.find((t) => t.name === scanName);
        if (test) {
          return `${scanName} - ${categoryName}`;
        }
      }
    }
  }

  // Fallback to original name if not found or no categories provided
  return scanName;
};

// Function to fetch scan categories from API
export const fetchScanCategories = async (): Promise<
  Record<string, ScanCategory>
> => {
  try {
    console.log("Fetching scan categories...");
    const response = await medivaApiClient.getAllServices();
    console.log("API response:", response);

    if (response.success && response.services && response.services.length > 0) {
      const transformed = transformApiDataToScanCategories(response.services);
      console.log("Transformed scan categories:", transformed);
      return transformed;
    } else {
      console.error("Failed to fetch services:", response.message);
      console.log("Using fallback data");
      return fallbackScanCategories;
    }
  } catch (error) {
    console.error("Error fetching scan categories:", error);
    console.log("Using fallback data due to error");
    return fallbackScanCategories;
  }
};

// Fallback data in case API fails
export const fallbackScanCategories: Record<string, ScanCategory> = {
  Radiology: {
    name: "Radiology",
    tests: [{ name: "Chest X-ray", price: 450 }],
  },
  Ultrasound: {
    name: "Ultrasound",
    tests: [{ name: "Abdomen Ultrasound", price: 2200 }],
  },
  Cardiology: {
    name: "Cardiology",
    tests: [{ name: "ECG", price: 500 }],
  },
};

// Helper function to get all test names for search functionality
export const getAllTestNames = (
  scanCategories: Record<string, ScanCategory>
): string[] => {
  // Add null/undefined checks
  if (!scanCategories || Object.keys(scanCategories).length === 0) {
    return [];
  }

  return Object.values(scanCategories).flatMap((category) => {
    if (category && category.tests && Array.isArray(category.tests)) {
      return category.tests.map((test) => test.name);
    }
    return [];
  });
};

// Helper function to get test price by name
export const getTestPrice = (
  testName: string,
  scanCategories: Record<string, ScanCategory>
): number | null => {
  // Add null/undefined checks
  if (!scanCategories || Object.keys(scanCategories).length === 0) {
    console.warn("getTestPrice called with empty scanCategories");
    return null;
  }

  for (const category of Object.values(scanCategories)) {
    if (category && category.tests && Array.isArray(category.tests)) {
      const test = category.tests.find((t) => t.name === testName);
      if (test) {
        return test.price;
      }
    }
  }
  return null;
};

// Helper function to get test category by name
export const getTestCategory = (
  testName: string,
  scanCategories: Record<string, ScanCategory>
): string | null => {
  // Add null/undefined checks
  if (!scanCategories || Object.keys(scanCategories).length === 0) {
    return null;
  }

  for (const [categoryName, category] of Object.entries(scanCategories)) {
    if (category && category.tests && Array.isArray(category.tests)) {
      const test = category.tests.find((t) => t.name === testName);
      if (test) {
        return categoryName;
      }
    }
  }
  return null;
};
