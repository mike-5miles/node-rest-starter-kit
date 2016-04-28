var constants = {
  X_FIVEMILES_USER_ID: 'X-FIVEMILES-USER-ID',
  X_FIVEMILES_USER_TOKEN: 'X-FIVEMILES-USER-TOKEN',

  ITEM_STATE: {
    LISTING: 0,
    SOLD: 1,
    UNAPPROVED: 4,
    UNAVAILABLE: 5,
    UNLISTED: 6,
    PENDING: 7
  },

  USER_STATE: {
    FORBIDDEN: 0,
    VALID: 1,
    DEACTIVE: 2,
    HIDDEN: 3,
    SUSPEND: 4
  },

  AD_PLAN_STATE: {
    PENDING: 1,
    PAID: 2,
    PAY_FAILED: 3,
    CANCELLED: 0
  },

  AD_PLAN_AD_TYPE: {
    FEATURED: 1
  }
}

module.exports = constants
