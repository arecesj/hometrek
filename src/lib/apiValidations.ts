import { z } from "zod"

export const newUserValidation = z
  .object({
    name: z.string().min(3, "Name is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(1, "Password is required").min(7, "Password must have at least 7 characters")
  })

export const lenderValidation = z
  .object({
    // trek
    potentialHomePrice: z.string().optional(),
    potentialDownPayment: z.string().optional(),
    selectedLender: z.object({
      name: z.string(),
      nmls: z.string(),
      minCreditScore: z.string(),
      minDownPaymentPercentage: z.string(),
      currInterestRate: z.string(),
    }).optional(),
    // manage
    hasOwnLender: z.boolean().optional(),
    plaidAccessToken: z.string().optional(),
    mortgageDetails: z.object({}).optional(),
  })

export const inspectionValidation = z
  .object({
    // trek
    selectedInspector: z.object({
      name: z.string(),
      imageURL: z.string(),
      rating: z.number(),
      distance: z.number(),
      pitch: z.string(),
      location: z.string(),
      avgCost: z.number(),
    }).optional(),
    // manage
    hasInspector: z.boolean().optional(),
    hasInspected: z.boolean().optional(),
    inspectionDetails: z.object({
      name: z.string().optional(),
      date: z.date().optional(),
      cost: z.number().optional(),
    }).optional(),
  })

export const appraisalValidation = z
  .object({
    // trek
    selectedAppraiser: z.object({
      name: z.string(),
      imageURL: z.string(),
      rating: z.number(),
      distance: z.number(),
      pitch: z.string(),
      location: z.string(),
      avgCost: z.number(),
    }).optional(),
    // manage
    hasAppraiser: z.boolean().optional(),
    hasAppraised: z.boolean().optional(),
    inspectionDetails: z.object({
      name: z.string().optional(),
      date: z.date().optional(),
      cost: z.number().optional(),
    }).optional(),
  })

export const insuranceValidation = z
  .object({
    // trek
    potentialHomePrice: z.string().optional(),
    potentialDownPayment: z.string().optional(),
    selectedInsurance: z.object({
      name: z.string(),
      policy: z.string(),
    }).optional(),
    // manage
    hasInsurance: z.boolean().optional(),
    // TODO: Canopy token?
    // canopyAccessToken: z.string().optional(),
    insuranceDetails: z.object({}).optional(),
  })

export const titleValidation = z
  .object({
    // trek
    selectedTitleAgent: z.object({
      name: z.string(),
      imageURL: z.string(),
      rating: z.number(),
      distance: z.number(),
      pitch: z.string(),
      location: z.string(),
      avgCost: z.number(),
    }).optional(),
    // manage
    hasTitleAgent: z.boolean().optional(),
    hasTitleTransfer: z.boolean().optional(),
    inspectionDetails: z.object({
      name: z.string().optional(),
      date: z.date().optional(),
      cost: z.number().optional(),
    }).optional(),
  })

export const closingDayValidation = z.object({})

export const taskValidation = z.object({
  category: z.string(),
  task: z.string(),
  status: z.string(),
  priority: z.string(),
})

export const costValidation = z.object({})

export const homeClosingValidation = z
  .object({
    state: z.string().optional(),
    zipCode: z.string().optional(),
    lenders: lenderValidation.optional(),
    inspections: inspectionValidation.optional(),
    appraisals: appraisalValidation.optional(),
    insurance: insuranceValidation.optional(),
    title: titleValidation.optional(),
    closingDay: closingDayValidation.optional(),
    tasks: taskValidation.optional().array().optional(),
    costs: costValidation.optional(),
  })
