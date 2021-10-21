import dayjs from "dayjs"
import "dayjs/locale/en-au.js"
import JsonResponse from "../common/JsonResponse.js"
import Settings from "../common/Settings.js"

export default (settings: Settings) => {
    const referenceMonday = dayjs(settings.bins.reference_date)
    const upcomingMonday = dayjs().locale("en-au").startOf("week").add(1, "week")
    const diff = upcomingMonday.diff(referenceMonday, "weeks") % 2
    const binType = diff === 0 ? "recycling" : "green"

    return new JsonResponse(200, {
        upcomingDate: upcomingMonday.format("YYYY-MM-DD"),
        binType: binType
    })
}