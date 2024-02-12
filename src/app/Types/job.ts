export type Job = {
    expires: {
        isExpire: boolean,
        expireMsg: string
    },
    jobRole: string,
    isApplyBtnPresent: boolean,
    date: string,
    location: string,
    jobRoles: { jobImage: string, jobRoleName: string }[],
    mba: {
        isMbaInternship: Boolean,
        mbaMsg: string
    },
    isviewBtnPresent: boolean,
    isMoreDetailsBtnPresent: boolean;
}