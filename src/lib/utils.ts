import { slug } from "github-slugger";
import { Post } from "#site/content";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function sortPosts(posts: Array<Post>) {
  return posts.sort((a, b) => {
    // @ts-ignore
    if (a.date > b.date) return -1;
    // @ts-ignore
    if (a.date < b.date) return 1;
    return 0;
  });
}

export function getAllTags(posts: Array<Post>) {
  const tags: Record<string, number> = {}
  posts.forEach(post => {
    // @ts-ignore
    post.tags?.forEach(tag => {
      tags[tag] = (tags[tag] ?? 0) + 1;
    })
  })

  return tags;
}

export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a])
}

export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter(post => {
    // @ts-ignore
    if (!post.tags) return false
    // @ts-ignore
    const slugifiedTags = post.tags.map(tag => slug(tag))
    return slugifiedTags.includes(tag)
  })
}

export const formatToUSD = (s: string) => {
  const amount = parseFloat(s)
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export const subtractNumStrings = (ns1: string, ns2: string) => {
  const sub = parseFloat(ns1) - parseFloat(ns2)
  return sub.toString()
}


export const isUserAuthenticated = (status: string) => status === "authenticated"

const  snakeToCamel = (obj: { [key: string]: any }): { [key: string]: any } => {
  const newObj: { [key: string]: any } = {};
  for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const camelKey = key.replace(/_(\w)/g, (_, letter) => letter.toUpperCase());
          newObj[camelKey] = obj[key];
      }
  }
  return newObj;
}

export const mapMortgageDetails = (mortgage) => {
  const m = snakeToCamel(mortgage)
  delete m.propertyAddress
  
  return {
    ...m,
    interestRatePercentage: mortgage.interest_rate.percentage,
    interestRateType: mortgage.interest_rate.type,
    city: mortgage.property_address.city,
    country: mortgage.property_address.country,
    postalCode: mortgage.property_address.post_code,
    region: mortgage.property_address.region,
    street: mortgage.property_address.street,
  }
}

export const mapInsuranceDetails = (insurance: CanopyConnectInsurancePull): InsuranceDetails => {
  const homeOwnersPolicy = insurance.policies.find(p => p.policy_type === "HOMEOWNERS")
  if(!homeOwnersPolicy) return {} as InsuranceDetails

  const propertyData = snakeToCamel(homeOwnersPolicy.dwellings[0].property_data)
  const coverages: CoverageDetails[] = homeOwnersPolicy.dwellings[0].coverages.map((c: CanopyCoverageDetails): CoverageDetails => {
    return snakeToCamel(c)
  })

  const dwellings: Dwelling = {
    ...snakeToCamel(homeOwnersPolicy.dwellings[0]),
    ...snakeToCamel(homeOwnersPolicy.dwellings[0].address),
    addressType: homeOwnersPolicy.dwellings[0].address.type,
    coverages,
    propertyData,
  }

  const namedInsureds: NamedInsured[] = homeOwnersPolicy.named_insureds.map((n: CanopyNamedInsureds): NamedInsured => {
    return snakeToCamel(n)
  })

  const policy = {
    ...snakeToCamel(homeOwnersPolicy),
    dwellings,
    namedInsureds
  }

  let agent;
  if(!insurance.agents[0]) {
    agent =  null
  } else {
    agent = {
      ...snakeToCamel(insurance.agents[0]),
      policyIds: JSON.stringify(insurance.agents[0].policy_ids),
    }
  } 

  return {
    insuranceProviderName: insurance.insurance_provider_name,
    noPolicies: insurance.no_policies,
    noDocuments: insurance.no_documents,
    policy,
    agent,
  } as InsuranceDetails
}
