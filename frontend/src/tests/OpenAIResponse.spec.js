import { shallowMount } from '@vue/test-utils';
import OpenAIResponse from '@/components/OpenAIResponse.vue';

// Mock global fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ reply: "Hello, how can I help you?" })
  })
);

describe('OpenAIResponse.vue', () => {
  let wrapper;
  const propsData = {
    currentModel: 'openai',
    chatHistory: [],
    value: 'Hi'
  };

  beforeEach(() => {
    wrapper = shallowMount(OpenAIResponse, { propsData });
    fetch.mockClear();  // Clear mock fetch data before each test
  });

  it('renders error message if there is an error', async () => {
    wrapper.setData({ error: 'Please ask a question!' });
    await wrapper.vm.$nextTick();  // Wait for the DOM to update
    expect(wrapper.text()).toContain('Please ask a question!');
  });

  it('does not call fetch if value is empty', async () => {
    wrapper.setProps({ value: '' });
    await wrapper.vm.getResponse();
    expect(fetch).not.toHaveBeenCalled();
    expect(wrapper.vm.error).toBe("Please ask a question!");
  });

  it('calls fetch with correct URL and options', async () => {
    await wrapper.vm.getResponse();
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:3000/chat/${propsData.currentModel}`,
      {
        method: 'POST',
        body: JSON.stringify({
          history: propsData.chatHistory,
          message: { role: "user", content: propsData.value }
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  });

  it('emits "update-chat-history" and "update-value" on successful API call', async () => {
    await wrapper.vm.getResponse();
    expect(wrapper.emitted('update-chat-history')).toBeTruthy();
    expect(wrapper.emitted('update-chat-history')[0]).toEqual([
      [{ role: "user", content: propsData.value }, { role: "system", content: "Hello, how can I help you?" }]
    ]);
    expect(wrapper.emitted('update-value')).toBeTruthy();
    expect(wrapper.emitted('update-value')[0]).toEqual(['']);  // Expect empty string to clear input
  });

  it('sets error if fetch call fails', async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API is down"));
    await wrapper.vm.getResponse();
    expect(wrapper.vm.error).toBe("Something went wrong. Please try again later.");
  });

  it('calls getResponse on component mount', () => {
    const spy = jest.spyOn(OpenAIResponse.methods, 'getResponse');
    shallowMount(OpenAIResponse, { propsData });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();  // Restore original function
  });
});
