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

export const mapMortgageDetails = (mortgage) => {
  return {
    accountId: mortgage.account_id,
    accountNumber: mortgage.account_number,
    currentLateFee: mortgage.current_late_fee,
    escrowBalance: mortgage.escrow_balance,
    hasPMI: mortgage.has_pmi,
    hasPrepaymentPenalty: mortgage.has_prepayment_penalty,
    interestRatePercentage: mortgage.interest_rate.percentage,
    interestRateType: mortgage.interest_rate.type,
    lastPaymentAmount: mortgage.last_payment_amount,
    lastPaymentDate: mortgage.last_payment_date,
    loanTerm: mortgage.loan_term,
    loanTypeDescription: mortgage.loan_type_description,
    maturityDate: mortgage.maturity_date,
    nextMonthlyPayment: mortgage.next_monthly_payment,
    nextPaymentDueDate: mortgage.next_payment_due_date,
    originationDate: mortgage.origination_date,
    originationPrincipalAmount: mortgage.origination_principal_amount,
    pastDueAmount: mortgage.past_due_amount,
    city: mortgage.property_address.city,
    country: mortgage.property_address.country,
    postalCode: mortgage.property_address.post_code,
    region: mortgage.property_address.region,
    street: mortgage.property_address.street,
    ytdInterestPaid: mortgage.ytd_interest_paid,
    ytdPrincipalPaid: mortgage.ytd_principal_paid,
  }
}