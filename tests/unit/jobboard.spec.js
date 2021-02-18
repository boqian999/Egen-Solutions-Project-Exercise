import { shallowMount } from '@vue/test-utils'
import JobBoard from '@/views/JobBoard'

describe('test JobBoard', () => {
    it('init value should be empty', () => {
        const wrapper = shallowMount(JobBoard)
        expect(wrapper.vm.description).toBe('')
    })

    it('when input changes, description should change', () => {
        const wrapper = shallowMount(JobBoard)
        wrapper.find('#description').setValue('Egen Solution')
        expect(wrapper.vm.description).toBe('Egen Solution')
    })

    it('init jobs should be empty array', () => {
        const wrapper = shallowMount(JobBoard)
        expect(wrapper.vm.jobs).toEqual([])
    })
    
})
