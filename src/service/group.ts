import {
    FailureCallbackFunction,
    GenericService,
    SuccessCallbackFunction,
} from '.';
import APIClient from '../utils/api-client';

export interface Group {
    id: string;
    name: string;
}

export interface GroupResponse {
    groups: Group[];
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
}

export interface GroupMember {
    nim: number;
    name: string;
    role: 'Mentor' | 'Member';
}

export interface GroupMemberResponse {
    members: GroupMember[];
    leaders: GroupMember[];
    name: string;
}

class GroupService extends GenericService {
    public async getGroupByID(
        id?: string,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET(`/groups/${id}/with-name`);
        const { name, leaders, members } = response;
        const leadersMapped: GroupMember[] = leaders.map((each: any) => ({ nim: each.username, name: each.name, role: 'Mentor' }));
        const membersMapped: GroupMember[] = members.map((each: any) => ({ nim: each.username, name: each.name, role: 'Member' }));
        this.handleResponse({ name, leaders: leadersMapped, members: membersMapped }, onSuccess, onFail);
    }

    public async getGroups(
        pageNumber: number = 1,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET('/groups', {
            'pagination[pageSize]': 10,
            'pagination[page]': pageNumber,
        });

        const { page, pageCount, pageSize, total }: { [key: string]: number } =
            response.meta.pagination;
        const raw: any[] = response.data;
        const groups: Group[] = raw.map((eachRaw: any) => {
            const each: any = eachRaw.attributes;
            return {
                id: each.id,
                name: each.name,
            };
        });
        const mappedResponse: GroupResponse = {
            groups,
            page,
            pageCount,
            total,
            pageSize,
        };

        this.handleResponse(mappedResponse, onSuccess, onFail);
    }
}

const service = new GroupService();
export default service;
