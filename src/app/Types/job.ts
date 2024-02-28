export type Job = {
    is_expire: boolean,
    expire_msg: string
    job_title: string,
    start_date: string,
    end_date: string,
    location: string,
    jobRoles: { jobImage: string, jobRoleName: string }[],
    is_internship_opportunity_for_mca: Boolean,
    mbaMsg: string,
    general_Instructions: string,
    system_Requirements: string,
    exam_Instructions: string,
    process:string
}