import { timeAgo } from '@/util/filters';

// describe a test name
describe('filters', () => {
    // the time when these tests were written
    // Wed Jan 30 2019 11:48:50 GMT+0100
    const timeOfWriting = 1548845330216 ;

    it('timeAgo: calculates minutes properly', () => {
        const time = 1548844331; // 16 minutes before the timeOfWriting (in seconds)
        const timeAgoResult = timeAgo(time, timeOfWriting);
        expect(timeAgoResult).toBe('16 minutes');
    });

    it('timeAgo: calculates hours properly', () => {
        const time = 1548808331; // 10 hours before the timeOfWriting (in seconds)
        const timeAgoResult = timeAgo(time, timeOfWriting);
        expect(timeAgoResult).toBe('10 hours');
    });

    it('timeAgo: calculates days properly', () => {
        const time = 1546684331; // 25 days before the timeOfWriting (in seconds)
        const timeAgoResult = timeAgo(time, timeOfWriting);
        expect(timeAgoResult).toBe('25 days');
    });
});
