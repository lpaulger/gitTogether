/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"BXbFl9h6XOzTkDEGWdGo8fEupw7VeOpF"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"Zk92RqDCrMye9ZfuZL98A01ieTYAJYNt"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"NISLjHEqLUASbigbnGjXvXdK13KhvGyS"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"cehtil08NQxHTO3wNidEFiAjCiktnfLR"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"fPXdX7Y3v1T85qZmMkbg9csnk1BrbGEA"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"B8NoWxug9E8STpoCo6JvYS083wxCjhH7"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
