import { shallowMount } from '@vue/test-utils';
import GeminiResponse from '@/components/GeminiResponse.vue';

// Mock global fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve("Sure, I can help with that.")
  })
);

describe('GeminiResponse.vue', () => {
  let wrapper;
  const propsData = {
    currentModel: 'gemini',
    chatHistory: [],
    value: 'How do I start?'
  };

  beforeEach(() => {
    wrapper = shallowMount(GeminiResponse, { propsData });
    fetch.mockClear();  // Clear mock fetch data before each test
  });

  it('renders error message if there is an error', async () => {
    wrapper.setData({ error: 'Error! Plz as a question!' });
    await wrapper.vm.$nextTick();  // Wait for the DOM to update
    expect(wrapper.text()).toContain('Error! Plz as a question!');
  });

  it('does not call fetch if value is empty', async () => {
    wrapper.setProps({ value: '' });
    await wrapper.vm.getResponse();
    expect(fetch).not.toHaveBeenCalled();
    expect(wrapper.vm.error).toBe("Error! Plz as a question!");
  });

  it('calls fetch with correct URL and options', async () => {
    await wrapper.vm.getResponse();
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:3000/chat/${propsData.currentModel}`,
      {
        method: 'POST',
        body: JSON.stringify({
          history: propsData.chatHistory,
          message: propsData.value
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
      [{ role: "user", parts: propsData.value }, { role: "model", parts: "Sure, I can help with that." }]
    ]);
    expect(wrapper.emitted('update-value')).toBeTruthy();
    expect(wrapper.emitted('update-value')[0]).toEqual(['']);  // Expect empty string to clear input
  });

  it('sets error if fetch call fails', async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API is down"));
    await wrapper.vm.getResponse();
    expect(wrapper.vm.error).toBe("Sth went wrong! Plz try again later.");
  });

  it('calls getResponse on component mount', () => {
    const spy = jest.spyOn(GeminiResponse.methods, 'getResponse');
    shallowMount(GeminiResponse, { propsData });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();  // Restore original function
  });
});
