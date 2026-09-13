// lib/billing.ts

// Checks if hosting fees should be charged
export const isHostingFeeActive = (): boolean => {
  return process.env.NEXT_PUBLIC_ENABLE_HOSTING_FEE === 'true';
};

// Returns 0 if fee is disabled, otherwise returns the normal fee
export const getHostingFee = (standardFee: number): number => {
  if (!isHostingFeeActive()) {
    return 0;
  }
  return standardFee;
};