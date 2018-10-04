import { MatDateFormats } from '@coachcare/datepicker';

export const MAT_MOMENT_DATE_FORMATS: MatDateFormats = {
    parse: {
        date: ['DD-MM-YYYY', 'DD/MM/YYYY', 'L'],
        datetime: ['YYYY-MM-DD HH:mm', 'YYYY/MM/DD HH:mm', 'L h:mma'],
        time: ['H:mm', 'HH:mm', 'h:mm a', 'hh:mm a']
    },
    display: {
        date: 'L',
        datetime: 'L h:mma',
        time: 'h:mm a',
        dateA11yLabel: 'L',
        monthDayLabel: 'MMM D',
        monthDayA11yLabel: 'MMMM D',
        monthYearLabel: 'MMMM YYYY',
        monthYearA11yLabel: 'MMMM YYYY',
        timeLabel: 'HH:mm'
    }
};
