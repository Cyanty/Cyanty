import * as aggregate from '../src/aggregate-user-info'
import * as type from '../src/type';
import { dummyData } from './dummy-data';

describe('github-graphql', () => {
    it('fetchData', async () => {
        const userInfo = await aggregate.aggregateUserInfo(dummyData);
        console.log(userInfo);

        expect(userInfo.contributionCalendar.length).toEqual(371);

        const languages: Array<type.LangInfo> = [
            {
                "language": "Java",
                "color": "#b07219",
                "contributions": 64.43
            },
            {
                "language": "Python",
                "color": "#3572A5",
                "contributions": 30.13
            },
            {
                "language": "Vue",
                "color": "#41b883",
                "contributions": 3.44
            },
            {
                "language": "TypeScript",
                "color": "#3178c6",
                "contributions": 1.06
            },
            {
                "language": "ANTLR",
                "color": "#9DC3FF",
                "contributions": 0.5
            },
            {
                "language": "JavaScript",
                "color": "#f1e05a",
                "contributions": 0.44
            }
        ];
        expect(userInfo.contributesLanguage).toEqual(languages);

        expect(userInfo.totalContributions).toEqual(366);
        expect(userInfo.totalCommitContributions).toEqual(344);
        expect(userInfo.totalIssueContributions).toEqual(4);
        expect(userInfo.totalPullRequestContributions).toEqual(12);
        expect(userInfo.totalPullRequestReviewContributions).toEqual(0);
        expect(userInfo.totalRepositoryContributions).toEqual(6);
        expect(userInfo.totalForkCount).toEqual(0);
        expect(userInfo.totalStargazerCount).toEqual(6);
    });
});
