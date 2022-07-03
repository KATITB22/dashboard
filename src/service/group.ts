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

export interface IGroup {
    name: string,
    leaders: number[],
    members: number[],
}

export interface GroupResponse {
    groups: Group[];
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
}

export interface GroupMember {
    id: string;
    name: string;
    // faculty: string;
}

export interface GroupMemberResponse {
    members: GroupMember[];
}

class GroupService extends GenericService {
    public async uploadGroup (
        data: IGroup,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.POST('/groups', data);

        this.handleResponse(response, onSuccess, onFail);
    }

    public async deleteAll (
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.DELETE('/groups');

        this.handleResponse(response, onSuccess, onFail);
    }
    
    public async getGroupByID(
        id?: string,
        onSuccess?: SuccessCallbackFunction,
        onFail?: FailureCallbackFunction
    ) {
        const response = await APIClient.GET(`/groups/${id}`);
        const members: GroupMember[] = response.members.map(
            (each: any, eachIdx: number) => ({
                id: eachIdx,
                name: each,
            })
        );

        const mappedResponse: GroupMemberResponse = {
            members,
        };
        this.handleResponse(mappedResponse, onSuccess, onFail);
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