import { shallowMount } from '@vue/test-utils';
import ModelSwitcher from '@/components/ModelSwitcher.vue';

// Mock global fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "Model activated" })
  })
);

describe('ModelSwitcher.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ModelSwitcher, {
      data() {
        return {
          selectedModel: 'openai'
        };
      }
    });
    fetch.mockClear();
  });

  it('renders a select element with default selected option', () => {
    expect(wrapper.find('select').element.value).toBe('openai');
  });

  it('emits "modelActivated" when a new model is selected', async () => {
    const select = wrapper.find('select');
    select.element.value = 'gemini'; // Change the select value to 'gemini'
    await select.trigger('change'); // Trigger the change event
    expect(wrapper.emitted('modelActivated')).toBeTruthy();
    expect(wrapper.emitted('modelActivated')[0]).toEqual(['gemini']);
  });

  it('calls fetch with the correct URL and options on model change', async () => {
    const select = wrapper.find('select');
    select.element.value = 'gemini';
    await select.trigger('change');
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/chat/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          history: [],
          message: ''
        })
      }
    );
  });

  it('handles fetch success correctly', async () => {
    const select = wrapper.find('select');
    select.element.value = 'gemini';
    await select.trigger('change');
    await flushPromises(); // Ensure all promises are resolved
    expect(console.log).toHaveBeenCalledWith('gemini model activated successfully', { message: "Model activated" });
  });

  it('handles fetch error correctly', async () => {
    fetch.mockImplementationOnce(() => Promise.reject("Network error"));
    const select = wrapper.find('select');
    select.element.value = 'gemini';
    await select.trigger('change');
    await flushPromises(); // Ensure all promises are resolved
    expect(console.error).toHaveBeenCalledWith('Error activating gemini model:', "Network error");
  });
});

// Helper function to flush all pending resolved promises
function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log
jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error
