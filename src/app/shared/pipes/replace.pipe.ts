import { Pipe, PipeTransform } from '@angular/core';

// {{'validation.maxlength' | translate | replace:"@count@":signupForm.get('password').errors['maxlength']['requiredLength']}}
@Pipe({
  name: 'replace',
})
export class ReplacePipe implements PipeTransform {
  transform(text: string, findString: string, toReplace: string): string {
    return (text.match(findString)) ? text.replace(findString, toReplace) : text;
  }
}
