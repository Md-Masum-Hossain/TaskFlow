import {baseApi} from '../../../app/api/baseApi';

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => '/tasks',
            providesTags: ['Tasks']
        }),
        createTask: builder.mutation({
            query: (taskData) => ({
                url: '/tasks',
                method: 'POST',
                body: taskData
            }),
            invalidatesTags: ['Tasks']
        }),
        updateTask: builder.mutation({
            query: ({ id, ...taskData }) => ({
                url: `/tasks/${id}`,
                method: 'PUT',
                body: taskData
            }),
            invalidatesTags: ['Tasks']
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Tasks']
        })
    }),
});


export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation
} = tasksApi;