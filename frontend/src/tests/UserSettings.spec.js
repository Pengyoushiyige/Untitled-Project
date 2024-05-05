import { shallowMount } from '@vue/test-utils';
import UserSettings from '@/components/UserSettings.vue';
import axios from 'axios';

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: { message: 'Settings saved successfully' } }))
}));

describe('UserSettings.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(UserSettings);
  });

  it('toggles the settings modal visibility', async () => {
    expect(wrapper.vm.showSettings).toBe(false);
    wrapper.vm.toggleSettings();
    expect(wrapper.vm.showSettings).toBe(true);
    wrapper.vm.toggleSettings();
    expect(wrapper.vm.showSettings).toBe(false);
  });

  it('binds input fields to data properties', async () => {
    const openAIKeyInput = wrapper.find('#openAIKey');
    const openAIEndpointInput = wrapper.find('#openAIEndpoint');
    await openAIKeyInput.setValue('newOpenAIKey');
    await openAIEndpointInput.setValue('https://new.endpoint.com');
    expect(wrapper.vm.openAIKey).toBe('newOpenAIKey');
    expect(wrapper.vm.openAIEndpoint).toBe('https://new.endpoint.com');
  });

  it('submits settings and emits success message', async () => {
    wrapper.vm.toggleSettings();  // Open settings modal
    wrapper.setData({
      openAIKey: 'testKey',
      openAIEndpoint: 'https://test.endpoint.com',
      openAIModel: 'gpt-3.5-turbo',
      openAITemperature: 0.5,
      openAIMaxTokens: 100
    });
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();  // Wait for all promises to resolve
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/settings', {
      openAI: {
        apiKey: 'testKey',
        endpoint: 'https://test.endpoint.com',
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        maxTokens: 100
      },
      gemini: expect.any(Object),
      claude: expect.any(Object)
    });
    expect(window.alert).toHaveBeenCalledWith('设置已保存!');
  });

  it('handles API errors gracefully', async () => {
    axios.post.mockImplementationOnce(() => Promise.reject(new Error('Failed to save settings')));
    wrapper.vm.toggleSettings();  // Open settings modal
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();
    expect(window.alert).toHaveBeenCalledWith('保存失败，请检查控制台了解详细信息。');
  });
});

// Helper function to flush all pending resolved promises
function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

// Mock global alert function
window.alert = jest.fn();
