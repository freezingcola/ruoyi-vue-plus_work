package org.dromara.workinfo.utils;

import org.dromara.common.core.utils.DateUtils;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class TimeParamsUtils {

    public static TimeParams createTimeParamsNextWeek(){
        return createTimeParamsWeek(true, -1);
    }
    public static TimeParams createTimeParamsPrevWeek(){
        return createTimeParamsWeek(true, 1);
    }

    public static TimeParams createTimeParamsCurrentWeek(){
        return createTimeParamsWeek(true, 0);
    }

    public static TimeParams createTimeParamsWeek(boolean withTime, int time){

        LocalDate currentDate = LocalDate.now();
        // 获取本周的开始时间（周一）
        LocalDate startOfWeek = currentDate.minusWeeks(time).with(DayOfWeek.MONDAY);
        // 获取本周的结束时间（周日）
        LocalDate endOfWeek = currentDate.minusWeeks(time).with(DayOfWeek.SUNDAY);
        // 格式化日期
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DateUtils.YYYY_MM_DD);

        TimeParams timeParams = new TimeParams();
        timeParams.setStartDate(startOfWeek.format(formatter));
        timeParams.setEndDate(endOfWeek.format(formatter));

        if(withTime){
            timeParams.setStart(timeParams.getStartDate() + " 00:00:00");
            timeParams.setEnd(timeParams.getEndDate() + " 23:59:59");
        }

        return timeParams;
    }

    public static TimeParams createTimeParamsMonth(boolean withTime){
        TimeParams timeParams = new TimeParams();
        String date = DateUtils.getDate();
        timeParams.setEndDate(date);
        if(withTime){
            date += " 23:59:59";
        }
        timeParams.setEnd(date);
        String[] strs = date.split("-");
        date = strs[0] + "-" + strs[1] + "-01";
        timeParams.setStartDate(date);
        if(withTime){
            date += " 00:00:00";
        }
        timeParams.setStart(date);
        return timeParams;
    }

    public static TimeParams createTimeParamsMonth(){
        return createTimeParamsMonth(true);
    }

    public static class TimeParams{

        private String start;

        private String end;

        private String startDate;

        private String endDate;

        public String getStart() {
            return start;
        }

        public void setStart(String start) {
            this.start = start;
        }

        public String getEnd() {
            return end;
        }

        public void setEnd(String end) {
            this.end = end;
        }

        public String getStartDate() {
            return startDate;
        }

        public void setStartDate(String startDate) {
            this.startDate = startDate;
        }

        public String getEndDate() {
            return endDate;
        }

        public void setEndDate(String endDate) {
            this.endDate = endDate;
        }
    }
}
